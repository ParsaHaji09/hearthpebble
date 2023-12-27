import { useState, useEffect } from "react"
import { useUpdateUserMutation } from "./usersAPISlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { CARDS } from "../options/cards"
import { CHARACTERS } from "../options/characters"
import { Dropdown } from 'primereact/dropdown';

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [deck, setDeck] = useState(user.deck)
    const [character, setCharacter] = useState(user.character)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setDeck([])
            setCharacter('')
            navigate('/home')
        }

    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onCharacterChanged = e => setCharacter(e.target.value)

    const onDeckChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setDeck(values)
    }

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password, deck, character })
        } else {
            await updateUser({ id: user.id, username, deck, character })
        }
    }

    const options = Object.values(CARDS).map(card => {
        return (
            <option
                key={card}
                value={card}

            > {card}</option >
        )
    })

    let canSave
    if (password) {
        canSave = [deck.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [deck.length, validUsername].every(Boolean) && !isLoading
    }
    const errClass = (isError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validDeckClass = !Boolean(deck.length) ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message) ?? ''


    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label className="form__label form__dropdown">
                    CHOSEN CHARACTER:
                    <Dropdown value={character} onChange={onCharacterChanged} options={CHARACTERS} optionLabel="character" 
                        placeholder="Select a Character" className="w-full md:w-14rem" />
                </label>

                <label className="form__label" htmlFor="deck">
                    CHOSEN CARDS:</label>
                <select
                    id="deck"
                    name="deck"
                    className={`form__select ${validDeckClass}`}
                    multiple={true}
                    size="3"
                    value={deck}
                    onChange={onDeckChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}
export default EditUserForm
