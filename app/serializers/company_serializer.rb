# frozen_string_literal: true

class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :domain_name, :description, :image

  # def image
	# 	rails_blob_path(object.image, only_path: true) if object.image.attached?
	# end
	# def image_url
  #   Rails.application.routes.url_helpers.url_for(image) if image.attached?
  # end
end
  