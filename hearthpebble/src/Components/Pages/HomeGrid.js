import React, {useEffect, useState} from "react";
import {GIDEONCARDS, FROSTBLOOMCARDS} from "../options/cards";

const imagesGideonCards = require.context('../../../public/Assets/GideonCards', true)
const imagesFrostbloomCards = require.context('../../../public/Assets/FrostbloomCards', true)

const gideonImageList = imagesGideonCards.keys().map(image => imagesGideonCards(image));
const frostbloomImageList = imagesFrostbloomCards.keys().map(image => imagesFrostbloomCards(image));
//const imageCardList = [...gideonImageList, ...frostbloomImageList];

const Grid = (obj) => {

    const [userCards, setUserCards] = useState([]);

    useEffect(() => {
        let chosenCharacterCardDeck = GIDEONCARDS
        if (obj.character === "Isolde Frostbloom"){
            chosenCharacterCardDeck = FROSTBLOOMCARDS
        }

        console.log(obj.curr_deck)

        function findIndicesByValues(valueList) {
            const indices = []
            valueList.forEach(element => {
                const index = chosenCharacterCardDeck.indexOf(element)
                if(index !== -1){
                    indices.push(index)
                }
            });
            return indices;
        }
        const correspondingIndexes = findIndicesByValues(obj.curr_deck)
        let temp_list = []
        if (obj.character === "Isolde Frostbloom"){
            temp_list = frostbloomImageList;
        }
        else{
            temp_list = gideonImageList;
        }
        const correspondingCards = correspondingIndexes.map(index => temp_list[index])
        setUserCards(correspondingCards)

    }, [obj.character, obj.curr_deck])

    return (
        <div>
            <div className='right-side'>

                <div className='Grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(5, 100px)', gap: '10px' }}>
                    {userCards.map((source, index) => (
                        <img key={index} src={source} alt={`Image ${index + 1}`} style={{ width: '130px', height: 'auto', objectFit: 'cover' }} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Grid;