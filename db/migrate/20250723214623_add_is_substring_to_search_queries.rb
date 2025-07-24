class AddIsSubstringToSearchQueries < ActiveRecord::Migration[7.0]
  def change
    add_column :search_queries, :is_substring, :boolean
  end
end
