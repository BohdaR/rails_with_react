# frozen_string_literal: true

class SlackAuthController < ApplicationController
  def user
    unless current_user.employee&.slack_id
      current_user.employee.update(slack_id: decode_token[0]["sub"])
    end
    redirect_to root_path
  end

  def company
    unless current_user.employee&.company&.slack_access_token
      current_user.employee.company.update(slack_access_token: get_company_token)
    end
    redirect_to root_path
  end

  private
    def get_jwt_token
      slack = Slack::Web::Client.new
      slack.openid_connect_token(
        code: params[:code],
        client_id: ENV["SLACK_CLIENT_ID"],
        client_secret: ENV["SLACK_CLIENT_SECRET"]
      )[:id_token]
    end

    def decode_token
      JWT.decode get_jwt_token, nil, false
    end

    def get_company_token
      slack = Slack::Web::Client.new
      slack.oauth_v2_access(
        code: params[:code],
        client_id: ENV["SLACK_CLIENT_ID"],
        client_secret: ENV["SLACK_CLIENT_SECRET"],
        redirect_uri: "https://#{ENV['HOST']}/company/auth/slack"
      )[:access_token]
    end
end
