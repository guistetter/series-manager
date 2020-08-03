//const Serie = require("../models/serie")

const index = ({Serie}, req, res) => {
  Serie.find({}, (err, docs) => {
    //res.send(docs)
    res.render("series/index", {series: docs})
  })
}
const novaProcess = ({Serie}, req, res) => {
  const serie = new Serie({
    name: "friends",
    status: "watched"
  })
  serie.save(() => console.log("saved"))
  res.render("series/nova")
}

const novaForm = (req,res) => {
  res.render('series/nova')
}
module.exports ={ 
  index, novaProcess, novaForm
}