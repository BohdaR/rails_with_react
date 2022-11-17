# frozen_string_literal: true

class User < ApplicationRecord
  has_one :employee, dependent: :destroy
  after_create :assign_employee

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2]

  def admin?
    role == "admin"
  end

  def self.from_google(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
      user.full_name = auth.info.name
      user.avatar_url = auth.info.image
    end
  end

  def assign_employee
    employee = Employee.find_by(email: self.email)
    employee.update(user_id: self.id) unless employee.nil?
  end
end
