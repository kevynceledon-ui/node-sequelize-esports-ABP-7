import Team from "./team.js"
import Player from "./player.js";

//relacion 1:N (uno a muchos)
//un equipo tiene muchos jugadores, esto añade automaticamente un "teamId" a la tabla players.

Team.hasMany(Player, {
    foreignKey:"teamId",
     as: "player",
      onDelete: "RESTRICT", //Evita que se borre un equipo si tiene jugadores
       onUpdate: "CASCADE"}); // si el ID del equipo cambia actualiza a los jugadores
Player.belongsTo(Team, {foreignKey:"teamId", as: "team"});

export {Team, Player};
