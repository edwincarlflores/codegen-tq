import { queryOptions } from '@tanstack/react-query'
import { graphql } from '../graphql'
import { execute } from '@/graphql/execute'

const PeopleCountQuery = graphql(`
  query PeopleCount {
    allPeople {
      totalCount
    }
  }
`)

export const peopleCountQuery = queryOptions({
  queryKey: ['people-count'],
  queryFn: () => execute(PeopleCountQuery),
})
