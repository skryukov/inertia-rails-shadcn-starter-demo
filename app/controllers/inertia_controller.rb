# frozen_string_literal: true

class InertiaController < ApplicationController
  inertia_config default_render: true
  inertia_share flash: -> { flash.to_hash },
      auth: {
        user: -> { Current.user.as_json(only: %i[id name email verified created_at updated_at]) },
        session: -> { Current.session.as_json(only: %i[id]) }
      }

  rescue_from ActiveRecord::ReadOnlyRecord, with: :redirect_back_with_error

  private

  def redirect_back_with_error(error)
    redirect_back(fallback_location: root_path, alert: error.message)
  end

  def inertia_errors(model, full_messages: true)
    {
      errors: model.errors.to_hash(full_messages).transform_values(&:to_sentence)
    }
  end
end
