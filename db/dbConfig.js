import mongoose from "mongoose";

mongoose.connect("mongodb+srv://vishwakarmapayal51:XCpf7VR7CFLId6Pb@cluster0.uu3awcq.mongodb.net/handcraft?retryWrites=true&w=majority")
    .then(result => {
        console.log("mongo Connected....");
    }).catch(err => {
        console.log(err);
    });

export default mongoose.connection;