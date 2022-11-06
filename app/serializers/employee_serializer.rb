class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :company_id, :office_id
  has_many :favorites
end
