/* ============================================================
   ✏️  CONFIGURATION : c'est ici que tu personnalises le cadeau
   ============================================================ */

// Prénom de la personne (laisse "" pour un message sans prénom)
const NOM = "Stella";   // ex : "Sarah"
const titre = NOM ? "Joyeux anniversaire " + NOM + " !" : "Joyeux anniversaire !";

// Petit mot affiché sous le titre, tout à la fin
const MESSAGE_FINAL = "Merci pour tous nos moments ❤️";

// Bouton « 📷 Mes photos » : permet à la personne de choisir ses propres photos.
// Laisse false si tes photos sont déjà dans le dossier photos/.
const AFFICHER_BOUTON_PHOTOS = false;

/* PHOTOS (8 maximum)
   - src : chemin de la photo dans le dossier photos/
   - bon : texte de la carte cadeau cachée dans le ballon de cette photo
   Pour changer une photo, remplace simplement le fichier (même nom),
   ou change le nom ici. Pour en enlever, supprime la ligne. */
const PHOTOS = [
  { src: "photos/photo1.jpg", bon: " Bon pour une partie de ton jeu préféré" },
  { src: "photos/photo2.jpg", bon: " je m'en souviens ca a été cool " },
  { src: "photos/photo3.jpg", bon: " Une soirée jeux parfaite" },
  { src: "photos/photo4.jpg", bon: " Tu gagnes la prochaine partie (promis, pour de faux 😏)" },
  { src: "photos/photo5.jpg", bon: " Une journée photos rien que pour toi" },
  { src: "photos/photo6.jpg", bon: " Un gros câlin à utiliser quand tu veux" },
  { src: "photos/photo7.jpg", bon: " Une surprise bonus à découvrir bientôt" },
  { src: "photos/photo8.jpg", bon: " Un vœu exaucé (dans la limite du raisonnable)" }
];

// Vœux qui s'envolent dans les lanternes
const VOEUX = ["Santé ❤️","Plein de bonheur","Des fous rires","Une année de folie","Plein de parties ensemble 🎮","Tous tes rêves","De la chance 🍀","Des surprises 🎁"];
