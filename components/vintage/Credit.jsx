/* Bildnachweis klein und dezent unten links im Bild (Nevio 24.11.2026).
   name ohne @, verlinkt auf das Instagram-Profil. Der Eltern-Container
   braucht position: relative oder absolute. */

export default function Credit({ name }) {
  return (
    <a className="v-credit" href={`https://www.instagram.com/${name}/`} target="_blank" rel="noopener noreferrer">
      @{name}
    </a>
  );
}
