import * as SQLite from 'expo-sqlite';
import { UserAccount } from './models';

const tableName = 'userData';

export const getDBConnection = async () => {
    return SQLite.openDatabaseAsync('user-data.db');
};

export const createTable = async (db: SQLite.Database) => {
    return new Promise((resolve, reject) => {
        db.withTransactionAsync(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS ${tableName} (
              name TEXT NOT NULL,
              email TEXT,
              phoneNo INTEGER
            );`,
                [],
                () => resolve(),
                (_, error) => {
                    reject(error);
                    return true; // Important for error handling in transactions
                }
            );
        });
    });
};

export const getUsers = async (db: SQLite.Database): Promise<UserAccount[]> => {
    return new Promise((resolve, reject) => {
        db.withTransactionAsync(tx => {
            tx.executeSql(
                `SELECT rowid AS id, name, email, phoneNo FROM ${tableName}`,
                [],
                (_, results) => {

                    const userAccs: UserAccount[] = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        userAccs.push(results.rows.item(i));
                    }
                    resolve(userAccs);
                },
                (_, error) => {
                    reject(error);
                    return true;
                }
            );
        });
    });
};

export const saveUsers = async (db: SQLite.Database, userAccs: UserAccount[]) => {
    return new Promise((resolve, reject) => {
        db.withTransactionAsync(tx => {
            userAccs.forEach(user => {
                console.log(user);

                tx.executeSql(
                    `INSERT OR REPLACE INTO ${tableName} (rowid, name, email, phoneNo) VALUES (?, ?, ?, ?)`,
                    [user.id, user.name, user.email, user.phoneNo],
                    () => { },
                    (_, error) => {
                        reject(error);
                        return true;
                    }
                );
            });
            resolve();
        });
    });
};



export const deleteUser = async (db: SQLite.Database, id: number) => {
    return new Promise((resolve, reject) => {
        db.withTransactionAsync(tx => {
            tx.executeSql(
                `DELETE FROM ${tableName} WHERE rowid = ?`, // Parameterized query
                [id],
                () => resolve(),
                (_, error) => {
                    reject(error);
                    return true;
                }
            );
        });
    });
};

export const deleteTable = async (db: SQLite.Database) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DROP TABLE IF EXISTS ${tableName}`, // Add IF EXISTS to avoid errors if table doesn't exist
                [],
                () => resolve(),
                (_, error) => {
                    reject(error);
                    return true;
                }
            );
        });
    });
};