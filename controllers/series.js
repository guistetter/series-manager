//const Serie = require("../models/serie")

const labels = [
  {id: 'to-watch', name:'Para assistir'},
  {id: 'watching', name:'Assistindo'},
  {id: 'watched', name:'Assistido'},
]

/*const index = ({Serie}, req, res) => {
  Serie.find({}, (err, docs) => {
    //res.send(docs)
    res.render("series/index", {series: docs, labels})
  })
}*/
const index = async ({Serie}, req, res) => {
  const docs = await Serie.find({})
    //res.send(docs)
    res.render("series/index", {series: docs, labels})
}

/*const novaProcess = ({Serie}, req, res) => {
  const serie = new Serie(req.body)
  serie.save(() => {
    console.log("saved series/nova")
    res.redirect("/series")
  })
}*/
const novaProcess = async ({Serie}, req, res) => {
  const serie = new Serie(req.body)
  try{
    await serie.save()
    console.log("saved series/nova")
    res.redirect("/series")
  }catch(e){
    console.log(Object.keys(e.errors))
    res.render('series/nova', {
      errors: Object.keys(e.errors)
    })
  }
}

const novaForm = (req,res) => {
  res.render('series/nova',{ errors: []})
}

/*const excluir = ({Serie}, req,res) => {
  Serie.remove({
    _id: req.params.id
  },(err) => {
    res.redirect('/series')
  })
}*/

const excluir = async ({Serie}, req,res) => {
  await Serie.remove({ _id: req.params.id})
    res.redirect('/series')
}

/*const editarProcess =({Serie}, req, res) =>{
  Serie.findOne({_id: req.params.id},(err, serie) =>{
    serie.name = req.body.name
    serie.status = req.body.status 
    serie.save()
    res.redirect('/series')
  })
}*/
const editarProcess = async ({Serie}, req, res) =>{
  const serie = await Serie.findOne({_id: req.params.id})
  serie.name = req.body.name
  serie.status = req.body.status 
  try{
    await serie.save()
    res.redirect('/series')
  }catch(e){
    res.render("series/editar",{serie, labels, errors: Object.keys(e.errors)})
  }
}

/*const editarForm = ({Serie}, req, res) => {
  Serie.findOne({_id: req.params.id}, (err, serie) =>{
  res.render("series/editar",{serie, labels})
  })
}*/
const editarForm = async ({Serie}, req, res) => {
  const serie = await Serie.findOne({_id: req.params.id})
  res.render("series/editar",{serie, labels, errors: []})
}

module.exports ={ 
  index, 
  novaProcess, novaForm, 
  excluir,
  editarProcess, editarForm
}