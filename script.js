import run from "./data.js";
     document.addEventListener('DOMContentLoaded', () => {
         const form = document.getElementById('geminiForm');
         const contentDiv = document.getElementById('body');
     
         form.addEventListener('submit', async (event) => {
             event.preventDefault();
             const symbol = form.symbol.value;
             
             try {
                 const text=await run("Poem about web dev, improve its creativity"+ req.body.body);
                 contentDiv.textContent =text.candidates[0].content.parts[0].text;
                 console.log(text.candidates[0].content.parts[0].text);
                 
             } catch (error) {
                 console.error('Error fetching Gemini data:', error);
             }
         });
     });
     