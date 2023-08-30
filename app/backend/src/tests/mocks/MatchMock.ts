export const matches = [{
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