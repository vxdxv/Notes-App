import Note from "../models/Notes.js";
import mongoose from "mongoose";
import { jsPDF } from "jspdf";

async function dashboard(req,res,next){
    let perpage=6;
    let page=(req.query.page)?(req.query.page):1;//So that we can go to diff pages by just typing page=1 etc
    console.log(req.query.page);
    console.log(page);
    const locals={
        username:req.user.firstName,
        title:"Dashboard",
        description:"Full NodeJS Notes App"
    }
    // console.log(checkUser);
    try{
        
            // Validate user ID
            if (!new mongoose.Types.ObjectId(req.user.id) ) {
                return next(new Error("Invalid user ID"));
            }
    
            // Aggregate notes
            const notes = await Note.aggregate([
                {
                    $sort: {
                        createdAt: -1 // Sort by newest first
                    }
                },
                {
                    $match: {
                        user: new mongoose.Types.ObjectId(req.user.id) // Match user ID
                    }
                },
                {
                    $project: {
                        title: { $substr: ['$title', 0, 30] },
                        body: { $substr: ['$body', 0, 100] },
                        borderColor:1,
                    }
                }
            ])
            .skip(perpage * (page - 1)) // Skip documents for pagination
            .limit(perpage); // Limit documents per page
    
            // Count total documents for pagination
            const count = await Note.countDocuments({ user: new mongoose.Types.ObjectId(req.user.id) });
            console.log(req.user.id);
            // Render the dashboard
            res.render('dashboard/index', {
                locals,
                notes,
                layout: '../views/layouts/dashboard',
                current: page,
                pages: Math.ceil(count / perpage),
            });

        }catch(error){
            console.log(error);
            return next(error);
        }};
async function dashboardViewNote(req,res){
    // res.render("dashboard/viewnotes")
    const note=await Note.findById({_id:req.params.id}).where({user:req.user.id}).lean();
    if(note){
        res.render("dashboard/viewnotes",{
            noteID:req.params.id,
            note,
            layout:'../views/layouts/dashboard'
        })
    }else{
        res.send("Something went wrong...");
    }
}
async function dashboardUpdateNote(req,res){
    await Note.findOneAndUpdate({_id:req.params.id},{title:req.body.title,body:req.body.text}).where({user:req.user.id});
    res.redirect("/dashboard");
}
async function dashboardDeleteNote(req,res){
    try{
        // console.log("veda");
        await Note.findOneAndDelete({_id:req.params.id},{title:req.body.title,body:req.body.text}).where({user:req.user.id});
    res.redirect("/dashboard");
    }catch(err){
        console.log(err);
    }
    
}
async function dashboardCreateNote(req,res){
    res.render("dashboard/add",{
        layout:'../views/layouts/dashboard'
    });
}
async function dashboardSubmitNote(req,res){
    const newNote = {
        user:req.user.id,
        title:req.body.title,
        body:req.body.text,
    };
    await Note.create(newNote);
    res.redirect("/dashboard");
}
async function dashboardSearchNotes(req,res){
    try{
        res.render("dashboarch/search",{
            searchResults:'',
            layout:'../views/layouts/dashboard'
        })
    }catch(error){
        console.log(error);
    }
    };
async function dashboardSearchSubmitNotes(req,res){
    try{
        let searchTerm=req.body.searchTerm;
        const searchNoSpecialCharacters=searchTerm.replace(/[^a-zA-Z0-9]/g,"");
        const searchResults=await Note.find({
            $or:[
                {title:{$regex: new RegExp(searchNoSpecialCharacters,'i')}},
                {body:{$regex: new RegExp(searchNoSpecialCharacters,'i')}},
            ],

        }).where({user:req.user.id})
            res.render("dashboard/search",{
                searchResults:searchResults,
                layout:'../views/layouts/dashboard'
            })
    }catch(error){
        console.log(error);
    }
}
// async function dashboardDownloadNote(req,res){
//     const doc = new jsPDF();
//     const content=JSON.parse(req.body.download);
//     doc.text(content.body, 100, 100);
//     doc.save(content.title+".pdf");
//     console.log(content);
//     res.redirect("/dashboard/item/"+req.params.id);
// }
async function dashboardDownloadNote(req, res) {
    try {
        const doc = new jsPDF();
        const content = JSON.parse(req.body.download);

        doc.text(content.body, 10, 10); // Adjust x, y coordinates as needed

        // Generate the PDF as a Buffer
        const pdfBuffer = doc.output('arraybuffer');

        // Set response headers to prompt download in the client
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${content.title}.pdf"`);
        res.send(Buffer.from(pdfBuffer));
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('An error occurred while generating the PDF');
    }
}
async function dashboardSetColor(req,res){
    
    res.render("dashboard/new",{

        noteID:req.params.id
    });
}
async function dashboardColored(req,res){
    console.log(req.body);
    console.log(req.user);
    console.log(req.params);
    await Note.findOneAndUpdate({_id:req.params.id},{borderColor:req.body.color}).where({user:req.user.id});
    res.redirect("/dashboard");
}

export default dashboard;
export {dashboardViewNote,dashboardUpdateNote,dashboardDeleteNote,dashboardCreateNote,dashboardSubmitNote,dashboardSearchNotes,dashboardSearchSubmitNotes,dashboardDownloadNote,dashboardSetColor,dashboardColored};