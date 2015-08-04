/**************
  DEFAULT ACTIONS
**************/

module.exports = [

  // pick random number from a range of numbers
  // @gopher: random 5-20
  {
    default: true,
    regex: ["random [0-9]+ ?- ?[0-9]+"],
    action: require('./random.js').randomRange
  },

  // pick something random from comma separated list e.g.
  // @gopher: random john,dave,steve
  {
    default: true,
    regex: ["random .*"],
    action: require('./random.js').randomList
  },

  // Return an averge for a set of numbers
  // @gopher: average 1,2,3,4,5
  {
    default: true,
    regex: ["average [0-9,\s]+"],
    action: require('./maths.js').average
  },

  // get a brief description from Wikipedia
  // @gopher: wiki Middlesbrough FC
  {
    default: true,
    regex: ["wiki .*"],
    action: require('./wiki.js').get
  }

]