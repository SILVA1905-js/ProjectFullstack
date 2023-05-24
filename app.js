const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


mongoose.connect('mongodb+srv://alessandro19005:wAAg1Ay0LGGVfZCV@backprojeto.qssdaus.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conexão estabelecida com o MongoDB.');
});


const userSchema = new mongoose.Schema({
  nome: String,
  email: String,
  telefone: String,
  genero: String,
  data_nascimento: Date,
  cidade: String,
  estado: String,
  endereco: String
});

const User = mongoose.model('User', userSchema);


const app = express();
app.use(express.json());


app.post('/users', (req, res) => {
  const userData = req.body;

  
  const user = new User(userData);

 
  user.save()
  .then(() => {
      return res.status(200).send("Usuário cadastrado com sucesso!");
  })
  .catch(err => {
      console.error(err);
      return res.status(500).send("Erro ao salvar usuário no banco de dados.");
  });

});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index1.html'));
  });
  


const port = 8080;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
