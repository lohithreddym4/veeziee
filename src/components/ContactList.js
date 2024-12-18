/* eslint-disable react-hooks/exhaustive-deps */
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';


export const ContactList = () => {
    const contacts = useSelector(state => {
        return state.contacts.contacts
    });
    const dispatch = useDispatch();
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [isSearch, setIsSearch] = useState(false)
    const [searchData, setSearchData] = useState([]);
    const [friends, setFriends] = useState([])
    const [fetching, setFetching] = useState(false);

    function getLogs(contact) {
        const obj = {
            name: contact.name,
            username: contact.username,
            lastseen: "12:00 PM, 01/12/2021 ",
            logs: []
        }
        dispatch({ type: "selected/setSelected", payload: obj });
    }
    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/getData/users')
            const data = await res.json()
            setFriends(data.users)
            dispatch({
                type: "contacts/setContacts", payload: data.users
            });
        }
        fetchData();
    }, [])
    const handleAdd=async()=>{
        try {
            const res=await fetch('/api/')
        } catch (error) {
            toast("An error Occured");
        }

    }
    const searchModal = (
        <div className="search-modal">
            {
                searchData.map((friend) => {
                    if (friend.name.toLowerCase().includes(search.toLowerCase()) || friend.username.toLowerCase().includes(search.toLowerCase())) {
                        return (
                            <button key={friend.username} className="contact">
                                <div className="contact-name">{friend.name.length > 20 ? friend.name.split(' ')[0] : friend.name}</div>
                                <div className="user-name">{friend.username}</div>
                                {
                                    <button
                                    onClick={handleAdd}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                }
                            </button>
                        )
                    }
                })
            }
        </div>
    )
    const contactsBlock = (
        contacts.map((contact) => {
            return (
                <button onClick={() => { getLogs(contact) }} key={contact.username} className="contact">
                    <div className="contact-name">{contact.name.length > 20 ? contact.name.split(' ')[0] : contact.name}</div>
                    <div className="user-name">{contact.username}</div>
                </button>
            )
        })
    )
    useEffect(() => {
        const id = setTimeout(async () => {
            if (isSearch) {
                try {
                    const res = await fetch('/api/getData/search?user=' + search)
                    const data = await res.json();
                    setSearchData(data.users)
                } catch (error) {
                    toast("An error Occurred")
                } finally {
                    setFetching(false)
                }
            }
        }, 500)
        return () => {
            clearTimeout(id);
        }
    }, [search])
    return (
        <div className="contacts-list">
            <div className="search-bar">
                <input type="text"
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setIsSearch(true)
                        if (e.target.value === "")
                            setIsSearch(false)
                    }}
                    placeholder="Search" />
                <button className='search-icon'>
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </button>
            </div>
            {isSearch ? searchModal : contactsBlock}
            {fetching && "Loading..."}
        </div>)
}