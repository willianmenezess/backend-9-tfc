export const matches = [{
    id: 7,
    homeTeamId: 12,
    homeTeamGoals: 4,
    awayTeamId: 6,
    awayTeamGoals: 2,
    inProgress: false,
    homeTeam: {
      teamName: "Palmeiras"
    },
    awayTeam: {
      teamName: "Ferroviária"
    }
},
{
  id: 8,
  homeTeamId: 6,
  homeTeamGoals: 2,
  awayTeamId: 12,
  awayTeamGoals: 1,
  inProgress: false,
  homeTeam: {
    teamName: "Ferroviária"
  },
  awayTeam: {
    teamName: "Palmeiras"
  }
},
{
  id: 9,
  homeTeamId: 1,
  homeTeamGoals: 2,
  awayTeamId: 2,
  awayTeamGoals: 1,
  inProgress: false,
  homeTeam: {
    teamName: "Santos"
  },
  awayTeam: {
    teamName: "Grêmio"
  }
},
{
  id: 10,
  homeTeamId: 2,
  homeTeamGoals: 3,
  awayTeamId: 2,
  awayTeamGoals: 3,
  inProgress: false,
  homeTeam: {
    teamName: "Grêmio"
  },
  awayTeam: {
    teamName: "Santos"
  }
},
// {
//   id: 11,
//   homeTeamId: 12,
//   homeTeamGoals: 6,
//   awayTeamId: 1,
//   awayTeamGoals: 1,
//   inProgress: false,
//   homeTeam: {
//     teamName: "Palmeiras"
//   },
//   awayTeam: {
//     teamName: "Santos"
//   }
// },
// {
//   id: 12,
//   homeTeamId: 1,
//   homeTeamGoals: 2,
//   awayTeamId: 6,
//   awayTeamGoals: 2,
//   inProgress: false,
//   homeTeam: {
//     teamName: "Santos"
//   },
//   awayTeam: {
//     teamName: "Ferroviária"
//   }
// },
]

export const matchesInProgressTrue = [{
    id: 7,
    homeTeamId: 12,
    homeTeamGoals: 2,
    awayTeamId: 6,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "Palmeiras"
    },
    awayTeam: {
      teamName: "Ferroviária"
    }
}
]

export const matchesInProgressFalse = [{
    id: 7,
    homeTeamId: 12,
    homeTeamGoals: 2,
    awayTeamId: 6,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: "Palmeiras"
    },
    awayTeam: {
      teamName: "Ferroviária"
    }
}
]

export const newMatchInput = {
  homeTeamId: 12,
  homeTeamGoals: 2,
  awayTeamId: 6,
  awayTeamGoals: 0,
}

export const newMatchFromDB = {
  id: 7,
  homeTeamId: 12,
  homeTeamGoals: 2,
  awayTeamId: 6,
  awayTeamGoals: 0,
  inProgress: true,
  homeTeam: {
    teamName: "Palmeiras"
  },
  awayTeam: {
    teamName: "Ferroviária"
  }
}

export const newMatchInputRepeatedTeam = {
  homeTeamId: 12,
  homeTeamGoals: 2,
  awayTeamId: 12,
  awayTeamGoals: 0,
}

export const matchWithInvalidTeamId = {
  homeTeamId: 120,
  homeTeamGoals: 2,
  awayTeamId: 12,
  awayTeamGoals: 0,
}