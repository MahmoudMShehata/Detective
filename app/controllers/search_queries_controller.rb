class SearchQueriesController < ApplicationController
  def top
    top_queries = SearchQuery
      .group(:query)
      .order('count_id DESC')
      .limit(10)
      .count(:id)

    queries = top_queries.to_a

    # Remove any query that is a substring of a longer one in the list
    filtered = queries.reject do |(query, _)|
      queries.any? do |(other_query, _)|
        query != other_query && other_query.include?(query)
      end
    end

    render json: filtered.first(5).map { |query, count| { query:, count: } }
  end
end
