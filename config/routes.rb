# frozen_string_literal: true

Rails.application.routes.draw do
  mount RailsAdmin::Engine => "/admin", as: "rails_admin"
  resources :reservations
  resources :companies
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
  get "/statistics/office_visiting/:office_id", to: "dashboard_statistics#office_visiting", as: "office_visiting"
  get "/favoriteplaces", to: "pages#favorite_places"
  get "/user/reservation", to: "pages#user_reservation", as: "user_reservation"
end
