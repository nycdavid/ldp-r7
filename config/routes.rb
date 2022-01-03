Rails.application.routes.draw do
  resources :data_points
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  resources :data_points, only: [:index]
end
