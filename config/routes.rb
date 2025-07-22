Rails.application.routes.draw do
  namespace :admin do
    get 'dashboard/index'
  end
  # get 'search/index'
  root "search#index"
  post "/search_queries", to: "search#create"

  namespace :admin do
    get "dashboard", to: "dashboard#index"
  end
  get 'search_queries/top', to: 'search_queries#top'
end
