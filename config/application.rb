# frozen_string_literal: true

require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module App
  class Application < Rails::Application
    ActiveStorage::Engine.config
                         .active_storage
                         .content_types_to_serve_as_binary
                         .delete("image/svg+xml")
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0
    config.hosts << "ec2-3-71-161-29.eu-central-1.compute.amazonaws.com"
    config.hosts << ENV["HOST"]
    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    config.time_zone = "Europe/Kiev"
    # config.eager_load_paths << Rails.root.join("extras")
    config.action_mailer.delivery_method = :smtp
    config.action_mailer.default_url_options = { host: ENV["HOST"], protocol: 'https' }
    config.action_mailer.smtp_settings = {
      address: "smtp.gmail.com",
      domain: "gmail.com",
      port: 587,
      user_name: ENV["MAILER_USER_NAME"],
      password: ENV["MAILER_USER_PASSWORD"],
      authentication: "plain"
    }
  end
end
