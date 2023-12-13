const fs = require('node:fs/promises');
const path = require('node:path');
const nanoid = require('nanoid');
require('colors');

const contactPath = path.join(__dirname, './db/contacts.json')

/**
 * Show contacts list
 * @returns {Array}
 */

async function listContacts () {
    try {
        const contacts = await fs.readFile(contactPath);
        return JSON.parse(contacts)
    } catch (error) {
        console.log(error.message)
    }
}
/**
 * Add Contact to contact list
 * @param {Object} contact 
 * @returns {Promise<void>}
 */

async function addContact (contactData){
    try {
        const newContact = {
            id: nanoid(),
            ...contactData
        }

        const contacts = await listContacts();
        contacts.push(newContact)
        fs.writeFile(contactPath, JSON.stringify(contacts));
        console.log(JSON.parse(fs.readFile(contactPath)))
        // return newContact;
    } catch (error) {
        console.log(error.message)
    }
}

/**
 * Remove contact from list
 * @param {string} id
 * @returns {Promise<void>}
 */

async function removeContact(contactId){
    try {
        const contacts = await listContacts();
        const filteredContacts = contacts.filter(contact => contact.id !== contactId);
        fs.writeFile(contactPath, JSON.stringify(filteredContacts))
        return contactId
    } catch (error) {
        console.log(error.message)
    }
}

/**
 * Find contact by ID
 * @argument {string}
 * @returns {Promise<void>}
 */
async function getContactById(contactId){
    try {
        const contacts = await listContacts()
        const searchedContact = contacts.filter(contact => contact.id === contactId);
        return searchedContact;
    } catch (error) {
        
    }
}

// module.exports = {
//     listContacts,
//     addContact,
//     removeContact,
//     getContactById,
// }

export {listContacts, addContact, removeContact,getContactById}