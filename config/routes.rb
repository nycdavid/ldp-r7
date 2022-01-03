Rails.application.routes.draw do
  root "data_points#index"

  resources :data_points
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
