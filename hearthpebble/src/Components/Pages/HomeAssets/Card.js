import {
    MeshBasicMaterial,
    BoxGeometry,
    Mesh,
    SRGBColorSpace,
    TextureLoader,
    Vector3
} from 'three';

const textureLoader = new TextureLoader();
const cardGeo = new BoxGeometry(0.4, 0.6, 0.001);

const frontCardTexture = textureLoader.load( "/Assets/Gideon1.png" );
frontCardTexture.colorSpace = SRGBColorSpace;

const coverTexture = textureLoader.load('/Assets/cardback.png');
coverTexture.colorSpace = SRGBColorSpace;

const card1Mat = [
    new MeshBasicMaterial(),
    new MeshBasicMaterial(),
    new MeshBasicMaterial(),
    new MeshBasicMaterial(),
    new MeshBasicMaterial({map: frontCardTexture}),
    new MeshBasicMaterial({map: coverTexture})
];

const CARDS = [];
const OPPCARDS = [];

const myCardsPositions = [
    new Vector3(0.5, 6.004, 4.21),
    new Vector3(0.25, 6.003, 4.17),
    new Vector3(0, 6.002, 4.15),
    new Vector3(-0.25, 6.001, 4.17),
    new Vector3(-0.5, 6, 4.21)
];

const myCardsRotations = [
    new Vector3(-Math.PI / 2, 0, -0.15),
    new Vector3(-Math.PI / 2, 0, -0.10),
    new Vector3(-Math.PI / 2, 0, 0),
    new Vector3(-Math.PI / 2, 0, 0.10),
    new Vector3(-Math.PI / 2, 0, 0.15)
];

function configureCard(card, pos, rot, rNumb, name) {
    card.name = name;
    card.castShadow = true;
    card.position.copy(pos[rNumb]);
    card.rotation.set(rot[rNumb].x, rot[rNumb].y, rot[rNumb].z);
    pos.splice(rNumb, 1);
    rot.splice(rNumb, 1);
    CARDS.push(card);
}

function configureOppCard(card, pos, rot, rNumb, name) {
    card.name = name;
    card.castShadow = true;
    card.position.copy(pos[rNumb]);
    card.rotation.set(rot[rNumb].x, rot[rNumb].y, rot[rNumb].z);
    pos.splice(rNumb, 1);
    rot.splice(rNumb, 1);
    OPPCARDS.push(card);
}

const minimum = 0;
let maximum1 = myCardsPositions.length - 1;
let randomNumber1 = Math.floor(Math.random() * (maximum1 - minimum + 1)) + minimum;

const card1 = new Mesh(cardGeo, card1Mat);
configureCard(card1, myCardsPositions, myCardsRotations, randomNumber1, 'hand playerCard1 emperor');

const card2 = new Mesh(cardGeo, card1Mat);
maximum1 = myCardsPositions.length - 1;
randomNumber1 = Math.floor(Math.random() * (maximum1 - minimum + 1)) + minimum;
configureCard(card2, myCardsPositions, myCardsRotations, randomNumber1, 'hand playerCard2 citizen');

const card3 = new Mesh(cardGeo, card1Mat);
maximum1 = myCardsPositions.length - 1;
randomNumber1 = Math.floor(Math.random() * (maximum1 - minimum + 1)) + minimum;
configureCard(card3, myCardsPositions, myCardsRotations, randomNumber1, 'hand playerCard3 citizen');

const card4 = new Mesh(cardGeo, card1Mat);
maximum1 = myCardsPositions.length - 1;
randomNumber1 = Math.floor(Math.random() * (maximum1 - minimum + 1)) + minimum;
configureCard(card4, myCardsPositions, myCardsRotations, randomNumber1, 'hand playerCard4 citizen');

const card5 = new Mesh(cardGeo, card1Mat);
maximum1 = myCardsPositions.length - 1;
randomNumber1 = Math.floor(Math.random() * (maximum1 - minimum + 1)) + minimum;
configureCard(card5, myCardsPositions, myCardsRotations, randomNumber1, 'hand playerCard5 citizen');

const opponentCardsPositions = [
    new Vector3(0.5, 8.47, 2.5),
    new Vector3(0.25, 8.5, 2.501),
    new Vector3(0, 8.515, 2.502),
    new Vector3(-0.25, 8.5, 2.503),
    new Vector3(-0.5, 8.47, 2.504)
];

const opponentCardsRotations = [
    new Vector3(2 * Math.PI, Math.PI, 0.15),
    new Vector3(2 * Math.PI, Math.PI, 0.10),
    new Vector3(2 * Math.PI, Math.PI, 0),
    new Vector3(2 * Math.PI, Math.PI, -0.10),
    new Vector3(2 * Math.PI, Math.PI, -0.15)
];

let maximum2 = opponentCardsPositions.length - 1;
let randomNumber2 = Math.floor(Math.random() * (maximum2 - minimum + 1)) + minimum;;

const card6 = new Mesh(cardGeo, card1Mat);
configureOppCard(card6, opponentCardsPositions, opponentCardsRotations, randomNumber2, 'slave');

const card7 = new Mesh(cardGeo, card1Mat);
maximum2 = opponentCardsPositions.length - 1;
randomNumber2 = Math.floor(Math.random() * (maximum2 - minimum + 1)) + minimum;
configureOppCard(card7, opponentCardsPositions, opponentCardsRotations, randomNumber2, 'citizen');

const card8 = new Mesh(cardGeo, card1Mat);
maximum2 = opponentCardsPositions.length - 1;
randomNumber2 = Math.floor(Math.random() * (maximum2 - minimum + 1)) + minimum;
configureOppCard(card8, opponentCardsPositions, opponentCardsRotations, randomNumber2, 'citizen');

const card9 = new Mesh(cardGeo, card1Mat);
maximum2 = opponentCardsPositions.length - 1;
randomNumber2 = Math.floor(Math.random() * (maximum2 - minimum + 1)) + minimum;
configureOppCard(card9, opponentCardsPositions, opponentCardsRotations, randomNumber2, 'citizen');

const card10 = new Mesh(cardGeo, card1Mat);
maximum2 = opponentCardsPositions.length - 1;
randomNumber2 = Math.floor(Math.random() * (maximum2 - minimum + 1)) + minimum;
configureOppCard(card10, opponentCardsPositions, opponentCardsRotations, randomNumber2, 'citizen');

export {CARDS, OPPCARDS}