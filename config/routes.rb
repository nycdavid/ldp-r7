Rails.application.routes.draw do
  resources :users
  root "data_points#index"

  resources :data_points

  get :about_us, to: "pages#about_us"
  get :retirement_calculator, to: "pages#retirement_calculator"
end
