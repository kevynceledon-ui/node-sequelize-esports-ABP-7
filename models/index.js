import Team from "./team.js"
import Player from "./player.js";

//relacion 1:N (uno a muchos)
//un equipo tiene muchos jugadores, esto añade automaticamente un "teamId" a la tabla players.

Team.hasMany(Player, {foreignKey:"teamId", as: "player"});
Player.belongsTo(Team, {foreignKey:"teamId", as: "team"});

export {Team, Player};
