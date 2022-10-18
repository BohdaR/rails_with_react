# frozen_string_literal: true

Rails.application.routes.draw do
  mount RailsAdmin::Engine => "/admin", as: "rails_admin"
  resources :reservations
  resources :offices
  resources :rooms do
    resources :places
    resources :favorites, only: [:create, :destroy]
  end
  
  devise_for :user,
     controllers: {
       omniauth_callbacks: "users/omniauth_callbacks"
     }

  root "pages#index"
  get "/booking", to: "pages#booking", as: "booking"
end
