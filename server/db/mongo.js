const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:25565/qa', (err)=>{
  if(err) {
    console.log(err);
    return;
  }
  console.log('connected to mongo')
});

const qaSchema = new mongoose.Schema({
  questions: 'test'
})

const QA = mongoose.model('QA', qaSchema);

module.exports = QA;