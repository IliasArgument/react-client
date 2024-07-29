import { createListenerMiddleware } from "@reduxjs/toolkit" // Импорт функции для создания middleware из Redux Toolkit
import { userApi } from "../services/userApi"


export const listenerMiddleware = createListenerMiddleware() // Создание middleware для прослушивания действий

// Настройка слушателя для обработки успешного выполнения запроса на вход в систему
listenerMiddleware.startListening({
  matcher: userApi.endpoints.login.matchFulfilled, // Указывает, что слушатель будет срабатывать на успешное выполнение действия login
  effect: async (action, listenerApi) => { // Определение асинхронного эффекта, который будет выполнен при срабатывании слушателя
    listenerApi.cancelActiveListeners() // Отмена всех активных слушателей

    if (action.payload.token) { // Проверка, есть ли в ответе сервера токен
      localStorage.setItem("token", action.payload.token) // Сохранение токена в localStorage
    }
  },
})
