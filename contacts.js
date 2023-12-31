const fs = require('node:fs/promises');
const path = require('node:path');
const nanoid = require('nanoid-esm');
const { bgCyan } = require('colors');
require('colors')


const contactPath = path.join(__dirname, './db/contacts.json')

/**
 * Show contacts list
 * @returns {Array}
 */

async function listContacts () {
    try {
        const data = await fs.readFile(contactPath, 'utf-8');
        console.table(JSON.parse(data))
        return JSON.parse(data)
    } catch (error) {
        console.log(error.message);
        return [];
    }
}
/**
 * Add Contact to contact list
 * @param {Object} contact 
 * @returns {Promise<void>}
 */

async function addContact (name, email, phone){
    try {
        const contactData = {
            name,
            email,
            phone,
        }
        const newContact = {
            id: nanoid(),
            ...contactData
        }
        const contacts = await listContacts();
        contacts.push(newContact)
        await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
        console.log('Contact added succesfully'.green.bgBlue)
        console.table(newContact || null)
        return newContact;
    } catch (error) {
        console.log(error.message).red
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
        await fs.writeFile(contactPath, JSON.stringify(filteredContacts, null, 2))
        console.log('Contact removed succesfully'.green.bgBlue)
        console.table(contacts.find(contact => contact.id === contactId) || null)
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
        console.log(`Here is your contact:`)
        console.table(searchedContact)
        return searchedContact || null;
    } catch (error) {
        
    }
}

module.exports = {
    listContacts,
    addContact,
    removeContact,
    getContactById,
}
