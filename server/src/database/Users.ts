import { randomUUID } from "crypto";
import { JSONFilePreset } from "lowdb/node";

export interface IUser {
  id: string;
  username: string;
  balance: number;
}

export interface IWinner extends IUser {
  amount: number;
  date: number;
}

export const database = await JSONFilePreset<Record<string, IWinner>>(
  "users.json",
  {}
);

export class Users {
  static getOne(id: string): IWinner | undefined {
    return database.data[id];
  }

  static getAll(): IWinner[] {
    return Object.values(database.data);
  }

  static findOne(predicate: (users: IWinner) => boolean): IWinner | undefined {
    return Users.getAll().find(predicate);
  }

  static async updateWinners(user: IWinner): Promise<IWinner> {
    // Получаем текущие записи из базы данных
    const currentWinners = Object.values(database.data);

    // Добавляем новую запись в начало массива
    const updatedWinners = [{ ...user, date: Date.now() }, ...currentWinners];

    // Обрезаем массив, чтобы оставить только 10 записей
    const trimmedWinners = updatedWinners.slice(0, 10);

    // Перезаписываем базу данных с обновленным массивом
    database.data = {};
    trimmedWinners.forEach((winner, index) => {
      database.data[index.toString()] = winner;
    });
    await database.write();

    return user;
  }

  static async create(username: string): Promise<IUser> {
    const user: IUser = {
      id: randomUUID(),
      balance: 100,
      username,
    };

    return user;
  }
}
