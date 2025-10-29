# Old khan academy projects
These are some games I made 3-5 years ago on khan adademy, and updated to modern javascript syntax.

If you guys have any of your own that you would like to update, follow these steps.
1. Download this repo.
2. Open in vs-code
3. Clear out all the khan-code between the two BREAK lines in any of the khan games, Chargy2 would be the best.
4. Paste your code between those lines.
   
5. Fix for loops; replace for(var with for(let
Press ctrl+f, search for for(var, click the dropdown arrow left of it, in the replace part, type for(let
Hold enter.
Now all the loops are updated.

6. Fix key input
Find and replace keyIsPressed/keyCode with KeysRef.held('key')
If needed, KeysRef.pressed('key') is one frame
Beware that syntax is different; UP/DOWN/LEFT/RIGHT = ArrowUp/Right/Down/Left, 32 = " "
You will need to fix all the number based keycodes.
49 = 1, 50=2, ect. Thats the code I remember.
   
7. Fix mouse input
Find & replace mouseIsPressed with MouseRef.held('left') // or 'right' if it has MouseButton
Replace MouseX with MouseRef.pos.x
Replace MouseY with MouseRef.pos.y

8. Do any manual adjustment needed after, there may be missing functions you will need to add.
   
**Key notes**
- Font size may need some manual adjustment
- Font type/similar will need to be fully deleted, the text() with custom font will need to be replaced with DrawRef.text() // see Draw.js for documentation
- This parser is not perfect, there are defenitly missing functions that may need to be added, but it'll give you a start.
- This should work without node.js, but if needed, you can use 'npx serve' to run, but this does require node.js installed.
