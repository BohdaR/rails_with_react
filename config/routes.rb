Rails.application.routes.draw do
  root 'booking#greeting'
  devise_for :users
end
