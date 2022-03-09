Rails.application.routes.draw do
  root "pages#tasks_home"

  resources :tasks
  resources :anki_decks
  resources :weights
  resources :users
  resources :sessions, only: [:new, :create, :destroy]

  get "/tasks_home", to: "pages#tasks_home"
end
