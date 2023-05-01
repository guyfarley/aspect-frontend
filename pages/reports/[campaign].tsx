import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import Header from '../../components/Header';
import { Install } from '../../typings';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import prisma from '../../db';
import { InstallsContext } from '../../context/InstallsContext';
import { Checkbox, Toolbar, Typography } from '@mui/material';
import Footer from '../../components/Footer';

interface Props {
  campaignInstalls: Install[]
}

export const getStaticPaths: GetStaticPaths = async () => {

  const installs = await prisma.install.findMany();
  const campaigns: string[] = [];

  // iterates through installs to capture an array of campaign names currently in database
  for (let i = 0; i < installs.length; i++) {
    const campaign = installs[i].campaign;
    if (!campaigns.includes(campaign)) {
      campaigns.push(campaign);
    }
  }

  // all possible paths are now the campaign names
  const paths = campaigns.map((campaign) => ({
    params: {
      campaign
    },
  }))
  return { paths, fallback: 'blocking' }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const installs = await prisma.install.findMany();
  // filters installs to those matching the campaign passed into params
  const campaignInstalls = installs.filter((install) => install.campaign === params!.campaign);

  // returns filtered-down installs, to be passed to CampaignReport component as props
  return {
    props: {
      campaignInstalls,
    },
    revalidate: 60,
  }
};

export default function Report({ campaignInstalls }: Props): JSX.Element {

  const { installs } = useContext(InstallsContext);
  const stateInstalls: Install[] = installs.filter((installFromState: Install) => installFromState.campaign === campaignInstalls[0].campaign);

  let reportInstalls: Install[] = [];
  if (stateInstalls) reportInstalls = stateInstalls;

  const thisCampaign = campaignInstalls[0].campaign;

  return (
    <>
      <div className="flex flex-col items-center">

        <Header />

        <div className="flex flex-col items-center h-full w-[90vw] mt-[120px] pb-8">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: '1400px' }}
              aria-label="simple table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <Toolbar
                    sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}
                  ><Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>{thisCampaign}</Typography>
                  </Toolbar>
                </TableRow>
                <TableRow>
                  <TableCell>Store Number</TableCell>
                  <TableCell align="left">Location</TableCell>
                  <TableCell align="left">Install Date</TableCell>
                  <TableCell align="left">Install Complete</TableCell>
                  <TableCell align="left">Revisit Needed</TableCell>
                  <TableCell align="left">Revisit Date</TableCell>
                  <TableCell align="left">Installer Notes</TableCell>
                  <TableCell align="left">PM Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaignInstalls.map((install) => (
                  <TableRow
                    key={install.storeNum}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {install.storeNum}
                    </TableCell>
                    <TableCell align="left">{install.location}</TableCell>
                    <TableCell align="left">{install.installDate}</TableCell>
                    <TableCell align="left">
                      <Checkbox checked={install.complete} />
                    </TableCell>
                    <TableCell align="left">
                      <Checkbox checked={install.revisitNeeded} />
                    </TableCell>
                    <TableCell align="left">{install.revisitDate}</TableCell>
                    <TableCell align="left">{install.installerNotes}</TableCell>
                    <TableCell align="left">{install.pmNotes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Footer />
      </div>
    </>
  );
}
