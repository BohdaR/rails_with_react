# frozen_string_literal: true

Rails.application.routes.draw do
  mount RailsAdmin::Engine => "/admin", as: "rails_admin"
  resources :reservations
  resources :offices
  resources :rooms do
    resources :places
  end
  resources :favorites, only: [:index, :create, :destroy]

  devise_for :user,
     controllers: {
       omniauth_callbacks: "users/omniauth_callbacks",
       sessions: "users/sessions",
       registrations: "users/registrations",
       passwords: "users/passwords"
     }

  root "pages#index"
  get "/booking", to: "pages#booking", as: "booking"
  get "/floors", to: "rooms#floors", as: "rooms_floors"
end
