// const path = require('path');
// const fs = require('fs');
// const uuid = require('uuid/v4');

let db;

const use = (dbInstance) => {
    db = dbInstance;
};

const list = () => db.all('SELECT * FROM printer ORDER BY id DESC');
const get = (id) => db.get('SELECT * FROM printer WHERE id = ?', id);
const getInUsePins = () => db.all('SELECT light_pin FROM printer').then((d) => d.map((i) => i.light_pin));

const save = async (id, data) => {
    const updated = new Date().toISOString();
    const printer = id ? await get(id) : null;

    const allData = data;
    allData.updated = updated;

    if (printer) {
        await db.run(
            `UPDATE printer SET ${Object.keys(allData).map((k) => `${k} = ?`).join(', ')} WHERE id = ?`,
            ...Object.values(allData), printer.id,
        );

        return printer.id;
    }

    allData.created = updated;

    const { lastID } = await db.run(
        `INSERT INTO printer (${Object.keys(allData).join(', ')}) VALUES(${Object.keys(allData).map(() => '?').join(', ')})`,
        ...Object.values(allData),
    );

    return lastID;
};

// const rename = async (id, newTitle) => db.run('UPDATE note SET title = ? WHERE id = ?', newTitle, id);

// const duplicate = async (id) => {
//     const updated = new Date().toISOString();
//     const filePath = `${uuid()}.png`;

//     const note = await db.get('SELECT * FROM note WHERE id = ?', id);

//     fs.copyFileSync(
//         path.resolve('.', 'data', 'note', note.path),
//         path.resolve('.', 'data', 'note', filePath),
//     );

//     const { lastID } = await db.run(
//         'INSERT INTO note(title, path, created, updated) VALUES(?, ?, ?, ?)',
//         `Copy of ${note.title}`, filePath, updated, updated,
//     );

//     return db.get('SELECT * FROM note WHERE id = ?', lastID);
// };

// const remove = async (id) => {
//     const note = await db.get('SELECT path FROM note WHERE id = ?', id);
//     await db.run('DELETE FROM note WHERE id = ?', id);

//     fs.unlinkSync(path.resolve('.', 'data', 'note', note.path));
// };

module.exports = {
    use,
    list,
    get,
    getInUsePins,
    save,
    // rename,
    // duplicate,
    // remove,
};
