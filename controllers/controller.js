class BotActions {
  constructor(){
    this.botIsCount = false
    this.numPersons = 0
    this.arrPersons = []
    this.arrAllGroups = []
    this.arrLiders = []
    this.rtm = {}
    this.channel = ''
  }

  translateMessages(e, rtm, channel) {
    const msg = e.text

    this.rtm = rtm
    this.channel = channel

    if(msg == 'bottis start') {
      this.sendMessageBot(e, 'Ey! Who is going to have lunch out today?', true)
    } else if(msg == 'bottis stop') {
      this.sendMessageBot(e, 'Goodbye!', false)
    } else if(msg == ':+1:') {
      this.botIsCount && this.startCountPersons(e)
    }
  }

  sendMessageBot(e, msg, status) {
    this.rtm.sendMessage(msg, this.channel)
    .then( res => {
      this.botIsCount = status
      !status && this.managementGroups(7)
    })
    .catch( err => console.log('status', err))
  }

  startCountPersons(e) {
    const userExists = this.arrPersons.includes(e.user)
    const reaction = e.text

    // if(!userExists && reaction === ':+1:') {
      this.arrPersons.push(e.user)
      this.rtm.sendMessage('<@'+e.user+'> is in!', this.channel)
  }

  managementGroups(maxPersons){
    this.arrPersons = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
    this.numPersons = this.arrPersons.length
    this.shuffleArray()

    const numGroups = Math.ceil(this.numPersons/maxPersons)
    const numPerGroup = Math.ceil(this.numPersons/numGroups)
    const smallGroup = (numPerGroup*numGroups) - this.numPersons
    const bigGroup = numGroups-smallGroup

    for(let i = 0; i<bigGroup; i++)
      this.arrAllGroups.push(this.arrPersons.splice(0, numPerGroup))

    if(this.numPersons > 7 && smallGroup > 0){
      for(let i = 0; i<smallGroup; i++)
        this.arrAllGroups.push(this.arrPersons.splice(0,numPerGroup-1))
    }

    this.chooseLider()
    console.log(this.arrLiders)
    this.showGroups()
  }

  showGroups(){
    for(let i = 0; i < this.arrAllGroups.length; i++){
      this.rtm.sendMessage('Group '+i+':', this.channel)
      for(let j = 0; j < this.arrAllGroups[i].length; j++){
        this.rtm.sendMessage('<@'+this.arrAllGroups[i][j]+'>', this.channel)
      }
    }

    this.numPersons = 0
    this.arrPersons = []
    this.arrAllGroups = []

  }

  shuffleArray(){
    this.arrPersons.sort( () => Math.random() - 0.5 )
  }

  chooseLider(){
    console.log(this.arrAllGroups)

    for(let i=0; i<this.arrAllGroups.length; i++){
      this.arrLiders[i] = this.arrAllGroups[i][0]
    }
  }
}

module.exports = BotActions
