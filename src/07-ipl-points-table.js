/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  // Your code here
  if (!Array.isArray(matches) || matches.length === 0) return [];
  // iplPointsTable([
  //   { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
  //   { team1: "RCB", team2: "CSK", result: "tie" },
  // ]);
  let pointsTable = [];

  for (const match of matches) {
    const { team1, team2, result, winner } = match;

    let t1Obj = pointsTable.find((e) => e.team === team1) ?? { team: team1, played: 0, won: 0, lost: 0, tied: 0, noResult: 0, points: 0 };
    let t2Obj = pointsTable.find((e) => e.team === team2) ?? { team: team2, played: 0, won: 0, lost: 0, tied: 0, noResult: 0, points: 0};

    t1Obj["played"] = (t1Obj["played"] || 0) + 1;
    t2Obj["played"] = (t2Obj["played"] || 0) + 1;

    switch (result) {
      case "win":
        const winTeam = winner === t1Obj.team ? t1Obj : t2Obj;
        const lostTeam = winner === t1Obj.team ? t2Obj : t1Obj;
        winTeam.won = (winTeam.won || 0) + 1;
        winTeam.points = (winTeam.points || 0) + 2;


        lostTeam.won = (lostTeam.won || 0);
        lostTeam.lost = (lostTeam.lost || 0) + 1;
        lostTeam.points = (lostTeam.points || 0);

        break;
      case "tie":
        t1Obj.tied = (t1Obj.tied || 0) + 1;

        t1Obj.points = (t1Obj.points || 0) + 1;

        t2Obj.tied = (t2Obj.tied || 0) + 1;

        t2Obj.points = (t2Obj.points || 0) + 1;
        break;

      case "no_result":
        t1Obj.noResult = (t1Obj.noResult || 0) + 1;
        t1Obj.points = (t1Obj.points || 0) + 1;

        t2Obj.noResult = (t2Obj.noResult || 0) + 1;
        t2Obj.points = (t2Obj.points || 0) + 1;
        break;
      default:
        break;
    }

    if (!pointsTable.find((e) => e.team === team1)) {
      pointsTable.push(t1Obj);
    }
    if (!pointsTable.find((e) => e.team === team2)) {
      pointsTable.push(t2Obj);
    }
  }

  pointsTable.sort((a,b) =>{
    if(b.points !== a.points) return b.points - a.points
    return a.team.localeCompare(b.team)
  })

  return pointsTable;
}
