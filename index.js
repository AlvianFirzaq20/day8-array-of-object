const express = require("express");

const res = require("express/lib/response");

const app = express();

const PORT = 100;

// const isLogin = true

const projects =[] //tugas day 8

// const isLogin = true;
app.set("view engine", "hbs"); //setup template engine / view engine

app.use("/public", express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',];

let project =[];

app.get('/', (req, res) => {
  let home = project.map((data)=>{
    return {
      duration : difference(data.start_date, data.end_date),
      ...data
    }
  })

  console.log(home);
  res.render('index', { projects: home });
})

app.get('/add-project',(req, res)=>{
  res.render('addproject')

})


app.post('/add-project',(req,res)=>{
  const name = req.body.title;
  const start_date = req.body.sdate
  const end_date = req.body.edate
  const description = req.body.content;
  const html = req.body.checkboxHtml
  const css =  req.body.checkboxCss
  const react = req.body.checkboxReact
  const javascript = req.body.checkboxJavascript
  const image = req.body.image
  
  let projectData = {
    name, start_date, end_date, description, image, html, css, react, javascript
  }
  project.push(projectData);
  console.log(projects)
  res.redirect('/');
})

app.get('/add-project/delete/:id',(req,res)=>{
  project.splice(req.params.id,1);
  res.redirect('/');
})

app.get('/project-update/:id',(req,res)=>{

  let data = req.params.id
  res.render('project-update',{id:data});

  
}) 


app.post('/project-update/:id',(req,res)=>{
  const data = req.params.id;
  const name = req.body.title;
  const start_date = req.body.sdate
  const end_date = req.body.edate
  const description = req.body.content;
  const html = req.body.checkboxHtml
  const css =  req.body.checkboxCss
  const react = req.body.checkboxReact
  const javascript = req.body.checkboxJavascript
  const image = req.body.image
  
  let projectData = {
    name, start_date, end_date, description, image, html, css, react, javascript
  }
  project[data] ={
    ...project[data], 
    ...projectData
  }
  res.redirect('/');     
  });


app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/project-detail/:id", (req, res) => {
    let id = req.params.id
    let home = project[id]
    let duration = home.duration = difference(home.start_date, home.end_date)
  

  res.render("project-detail",{project:home,duration});
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

function difference(sdate, edate) {
  sdate = new Date(sdate);
  edate = new Date(edate);
  const sdateutc = Date.UTC(sdate.getFullYear(), sdate.getMonth(), sdate.getDate());
  const edateutc = Date.UTC(edate.getFullYear(), edate.getMonth(), edate.getDate());
    day = 1000*60*60*24;
    dif =(edateutc - sdateutc)/day;
  return dif < 30 ? dif +" hari" : parseInt(dif/30)+" bulan"
}

function getFullTime(dateStart,dateEnd){
  dateStart= new Date(dateStart);
  dateEnd = new Date(dateEnd);
  return `${dateStart.getDate()} ${month[dateStart.getMonth()]} ${dateStart.getFullYear()} - ${dateEnd.getDate()} ${month[dateEnd.getMonth()]} ${dateEnd.getFullYear()}`;
}