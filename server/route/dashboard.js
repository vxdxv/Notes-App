import express from "express";
const router=express.Router();
import dashboardcontroller from '../controllers/dashboardcontroller.js';
import isLoggedIn from "../middleware/checkAuth.js";
import { dashboardViewNote,dashboardUpdateNote,dashboardDeleteNote,dashboardCreateNote,dashboardSubmitNote,dashboardSearchNotes,dashboardSearchSubmitNotes,dashboardDownloadNote,dashboardSetColor,dashboardColored,dashboardEnhance,dashboardEnhanced,dashboardUpdateNotefromAi} from "../controllers/dashboardcontroller.js";


//Login routes
router.get('/dashboard',isLoggedIn,dashboardcontroller);
router.get('/dashboard/item/:id',isLoggedIn,dashboardViewNote);
router.patch('/dashboard/item/:id',isLoggedIn,dashboardUpdateNote);

//Download notes
router.post('/dashboard/item/:id',isLoggedIn,dashboardDownloadNote);

//Setting and updating color
router.get('/dashboard/new/:id',isLoggedIn,dashboardSetColor);
router.post('/dashboard/new/:id',isLoggedIn,dashboardColored);

//Adding a note
router.get('/dashboard/add',isLoggedIn,dashboardCreateNote);
router.post('/dashboard/add',isLoggedIn,dashboardSubmitNote);

//Searching for a note
router.post('/dashboard/search',isLoggedIn,dashboardSearchSubmitNotes);
router.get('/dashboard/search',isLoggedIn,dashboardSearchNotes);

//Deleting a note
router.delete('/dashboard/item-delete/:id',isLoggedIn,dashboardDeleteNote);

//Enhancing with Ai
router.get("/dashboard/ai/:id",isLoggedIn,dashboardEnhance);
router.post("/dashboard/ai/:id",isLoggedIn,dashboardUpdateNotefromAi);
router.patch('/dashboard/ai/:id',isLoggedIn,dashboardEnhanced);

export default router;