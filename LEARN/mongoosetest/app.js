const dbConnect = require('./modules/dbconnect')
dbConnect()

const Judge = require('./modules/judge')
const Team = require('./modules/team')

const sqsptd = {
  name: '三泉审判团队'
}
const gjsptd = {
  name: '古交审判团队'
}

const runtu = {
  name: '闰土2',
  avatar: '999.jpg',
  office: '绍兴县',
  position: '渔业部主任',
  proportion: 3,
  tel: '17799298949',
  // teams: []
  teams: [
    {
      team: '',
      numberOfCasesHandled: [0, null, null, null, null, null, null, null, null, null, null, null, null]
    },
    {
      team: '',
      numberOfCasesHandled: [0, null, null, null, null, null, null, null, null, null, null, null, null]
    }
  ]
}

async function createTeam() {
  // const [team0, team1] = await Team.create([gjsptd, sqsptd])

  const [team0, team1] = await Team.find({})

  runtu.teams[0].team = team0._id
  runtu.teams[1].team = team1._id

  await Judge.create([runtu])
  // findJudge()
}
// createTeam()

async function findJudge0() {
  const res = await Judge.find({}).populate({ path: 'teams.team', select: 'name' })
  console.log(res[0])
}
// findJudge0()

async function findJudge() {
  const res = await Judge.aggregate([
    { $match: {} }, // 匹配
    { $unwind: '$teams' },
    {
      $lookup: {
        from: 'teams',
        localField: 'teams.team',
        foreignField: '_id',
        as: 'teams.teamm'
      }
    },
    // {
    //   $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$teams', 0] }, '$$ROOT.teamss'] } }
    // }
    { $unwind: '$teams.teamm' },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        avatar: { $first: '$avatar' },
        office: { $first: '$office' },
        position: { $first: '$position' },
        tel: { $first: '$position' },

        teams: { $push: '$teams' },
        __v: { $first: '$__v' }

        // teams: { $mergeObjects: '$root' }
      }
    }
  ])
  // console.log(...res)
  console.log(res[0].teams)
}
findJudge()
