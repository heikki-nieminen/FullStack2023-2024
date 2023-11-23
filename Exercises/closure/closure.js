//  4.1
/*
Kutsuttaessa b()() tulostuu consoleen: 
Moi
5

Kun b()() kutsutaan, ensimmäisenä kutsutaan b(), joka palauttaa sulkeuman joka sisältää muuttuja a,
sekä funktion funktion b palautuksesta. Tätä uutta funktioo kutsutaan heti perään.

Kutsuttaessa a=b(), sekä perään a(), tulostuu myös 
Moi
5
Tämä tapahtuu koska a:han sijoitetaan b() kutsun palautus. Eli a=b();a() tekee käytännössä saman kuin b()()
*/

function b() {
  let a = 5
  console.log('Moi')
  return function () {
    console.log(a)
    a++
  }
}

b()()

a = b()
a()

//  4.3?
/*
Täysin sama funktio nuoli-funktioina toteuttaen.
*/

const b1 = () => {
  let a = 5
  console.log('Moi')
  return () => {
    console.log(a)
    a++
  }
}

b1()()

//  4.4
/*
Koodilla pyritään näyttäämään, mitä kenttää olet täyttämässä, kun kyseinen kenttä on valittuna (focused).
Virheet koodissa:
-asetaHelp nimistä funktiota ei ole
-jos ideana käyttää sellaisenaan, täytyy olla <script> tagit javascriptin ympärillä
-propertyille ei tarvitse lainausmerkkejä
-var on vanhanaikaista ja väärä tapa
-onFocus handleria kutsuttaessa mistä tahansa kentästä tulee aputekstiksi: 'Your age (you must be over 16)',
koska se on viimeisimpänä listalla. Eli kun for-loopissa luodaan .onfocus handlereita, on niistä kaikilla sama item.
-for(let item of helpTeksti){document....}
Korjattu versio omassa tiedostossa (4.4.html)
*/

//  4.5

const teeLisääjä = (num1) => {
  return (num2) => {
    return num1 + num2
  }
}
const lisääKolmonen = teeLisääjä(3)
console.log(lisääKolmonen(5))

//  4.6
/*
 Kyseessä on ns. IIFE(immediately invoked function expression), jossa funktio suoritetaan heti luomisen jälkeen. 
 Tämä palauttaa objektin, joka sisältää increment, decrement ja value avaimet. Avaimiin on sijoitettu funktiot, 
 joiden sisällä kutsutaan varsinaista lukua muuttavaa funktiota eri arvoilla. Muuttujan sisällä oleva privateCounter
 on sulkeumassa, joka mahdollistaa tämän.
*/

//  4.7
/*
 Oleellisin ero lienee se, että tässä tapauksessa funkiota ei kutsuta suoraan alustettaessa makeCounteria. Vaan sitä
 kutsutaan vasta kun luodaan counter1 ja counter2.
*/
