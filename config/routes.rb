Rails.application.routes.draw do
  resources :anki_decks
  resources :weights
  resources :users
  root "data_points#index"

  resources :data_points

  get :about_us, to: "pages#about_us"
  get :retirement_calculator, to: "pages#retirement_calculator"

  get "/sample", to: "pages#sample"
end
