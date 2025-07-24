Rails.application.routes.draw do
  namespace :admin do
    get 'dashboard/index'
  end
  root "search#index"
  post "/search_queries", to: "search#create"

  namespace :admin do
    get "dashboard", to: "dashboard#index"
  end
  resources :search_queries, only: [:create] do
    collection do
      get :top
      get :latest
    end
  end
  get "/search_queries/recent", to: "search#recent"

  mount ActionCable.server => '/cable'
end
