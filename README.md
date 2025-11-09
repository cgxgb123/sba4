Challenges faced during the project.
How you approached solving those challenges.
What you would improve if given more time.

One of the biggest challenges I faced during this project was managing variable naming conflicts and making sure my functions referenced the right elements or values. Early on, I used the same variable names for both DOM elements and the data stored in my task objects, for example using status and taskName to refer to both the input fields and the object properties. This caused my functions such as addTask() and displayTasks() to break or overwrite the wrong data because they could not tell which variable I was referring to. I solved this by renaming my DOM variables with clearer identifiers like tStatus and nameVal and carefully tracing how data moved between input fields, arrays, and localStorage. If I had more time, I would likely spend it restructuring my code to separate logic for storage, UI rendering, and event handling to make debugging easier.
