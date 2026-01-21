Q. how I handled the "Add Product" state.

for adding the product what i did was that i made a state variable and passed the data of form to the fucntion which sets state value!

then i did JSON.Stringify on state variable and stored in localstorage 

then i came and handled edge cases like when there are/is already product in localstorage for that first what i did was load the localstorage data in the initial value of state variable and then simply used spread operator for extracting the whole object and then append the new data in that !



_______________________________

Q.  A brief comment on the code explaining why React Fragments were used in your 
    components


react fragment i used in card component and homepage component to group the divs ! i could haved used <div> or other tag but it would create and introduce a new node in the tree which is generally not optimized and of no meaning and also improves the rendering speed.